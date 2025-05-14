import assert from 'node:assert';
import { describe, it, test } from 'node:test';
import { google } from './index.js';

const example: google.events.cloud.firestore.v1.IDocumentEventData = {
    value: {
        name: 'projects/usr-wilfred39/databases/(default)/documents/bron-lak:tasks/139WjfQXhnUOfFR3LU13',
        fields: {
            type: { stringValue: 'bron-lak:verwerk-loonaangiftebestand' },
            job: {
                mapValue: {
                    fields: {
                        jobType: { stringValue: 'default' },
                        timeout: { integerValue: 10800000 },
                        maxTryCount: { integerValue: 3 },
                        execution: { nullValue: google.protobuf.NullValue.NULL_VALUE },
                    },
                },
            },
            createdAt: { timestampValue: { seconds: 1747148090, nanos: 758000000 } },
        },
    },
};

test('DocumentEventData van encode and decode', () => {
    const encoded = google.events.cloud.firestore.v1.DocumentEventData.encode(example).finish();
    const decoded = google.events.cloud.firestore.v1.DocumentEventData.decode(encoded);
    assert.deepEqual(google.events.cloud.firestore.v1.DocumentEventData.toObject(decoded, { longs: Number }), example);
});
