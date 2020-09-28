const { Client } = require("@elastic/elasticsearch");

import { flatMap } from "../../utils";

export class ElasticsearchService {
  constructor() {
    this.client = new Client({
      node: process.env.ELASTICSEARCH_URL,
      auth: {
        username: process.env.ELASTICSEARCH_USER,
        password: process.env.ELASTICSEARCH_PASSWORD,
      },
    });
  }

  async search(index) {
    return this.client.search({
      index,
      body: {
        query: {
          match_all: {},
        },
      },
    });
  }

  async add(index, data) {
    return this.client.index({ index, id: data.id, body: data, refresh: true });
  }

  async update(index, id, data) {
    return this.client.update({ index, id, body: data, refresh: true });
  }

  async delete(index, id) {
    return this.client.delete({ index, id, refresh: true });
  }

  async bulkAdd(index, data) {
    const body = flatMap(data, (doc) => {
      const { _id, ...docData } = doc.toJSON(); // Field [_id] is a metadata field and cannot be added inside a document
      return [{ index: { _index: index } }, { id: doc._id, ...docData }];
    });
    await this.client.bulk({ body, refresh: true });
    const { body: bulkResponse } = await this.client.bulk({
      refresh: true,
      body,
    });

    if (bulkResponse.errors) {
      const erroredDocuments = [];
      // The items array has the same order of the dataset we just indexed.
      // The presence of the `error` key indicates that the operation
      // that we did for the document has failed.
      bulkResponse.items.forEach((action, i) => {
        const operation = Object.keys(action)[0];
        if (action[operation].error) {
          erroredDocuments.push({
            // If the status is 429 it means that you can retry the document,
            // otherwise it's very likely a mapping error, and you should
            // fix the document before to try it again.
            status: action[operation].status,
            error: action[operation].error,
            operation: body[i * 2],
            document: body[i * 2 + 1],
          });
        }
      });
      return erroredDocuments;
    }

    return [];
  }
}
