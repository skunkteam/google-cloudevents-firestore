# @skunkteam/google-cloudevents-firestore

This module provides pre-compiled JavaScript classes and TypeScript types for decoding Google Cloud Events from Firestore, simplifying the
development of Cloud Functions that respond to Firestore events.

## Motivation

When building Google Cloud Functions triggered by Firestore events, you receive CloudEvents with binary payloads containing protobuf-encoded
Firestore event data. Google's documentation suggests compiling protobuf decoders at runtime, which introduces complexities:

-   You need to include `.proto` files in your application bundle.
-   Runtime compilation adds overhead and potential errors.
-   The resulting JavaScript classes lack TypeScript type definitions, hindering development and maintainability.

## Solution

`@skunkteam/google-cloudevents-firestore` addresses these issues by:

1.  **Pre-compiling protobuf definitions:** The necessary `.proto` files are compiled into JavaScript classes during the module's build
    process.
2.  **Including TypeScript types:** Type definitions are generated alongside the JavaScript classes, providing a fully typed development
    experience.
3.  **Simplifying usage:** You can directly import and use the pre-compiled classes in your Cloud Functions, eliminating runtime
    compilation and the need to manage `.proto` files.

This approach streamlines the development of Firestore-triggered Cloud Functions, improving code clarity, reducing errors, and enhancing
maintainability.

## Example Usage

```typescript
import * as functions from '@google-cloud/functions-framework';
import { google } from '@skunkteam/google-cloudevents-firestore';
import assert from 'node:assert';

functions.cloudEvent('onTaskCreate', async function onTaskCreate(cloudEvent: functions.CloudEvent<Buffer>) {
    console.log(`Function triggered by event on: ${cloudEvent.source}`);
    console.log(`Event type: ${cloudEvent.type}`);

    console.log('Decoding data...');
    assert(Buffer.isBuffer(cloudEvent.data));
    const firestoreReceived = google.events.cloud.firestore.v1.DocumentEventData.decode(cloudEvent.data);

    console.log('\nOld value:');
    console.log(JSON.stringify(firestoreReceived.oldValue, null, 2));

    console.log('\nNew value:');
    console.log(JSON.stringify(firestoreReceived.value, null, 2));
});
```

## Installation

```bash
npm install @skunkteam/google-cloudevents-firestore
```
