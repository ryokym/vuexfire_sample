import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
require('dotenv').config();

admin.initializeApp(functions.config().firebase);

const options = functions
  .runWith({
    timeoutSeconds: 60,
    memory: '256MB',
  })
  .region(process.env.REGION as string);

const exportHttpsFunc = (
  builder: functions.FunctionBuilder,
  functionName: string
) => {
  exports[functionName] = builder.https.onCall(
    require(`./functions/${functionName}`).c.run
  );
};

exportHttpsFunc(options, 'addUser');
exportHttpsFunc(options, 'deleteAllUser');
