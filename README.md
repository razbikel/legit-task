# Legit Code exercise
<br />

### How to run this code:
Node.js must be installed on your machine.<br />
run the command - 'npm i' for installing node moudules<br />
run the command 'node index.js' in order to start the server for listening to webhooks in localhost:3000<br />
I used ngrok for forwarding the webhooks from an external static address to localhost.<br />
With ngrok run the command './ngrok http 3000'<br />
So in order the app will be able to handle events the webhook address needs to be manually reset, with the new address ngrok will provide to this server.<br />
The server will route the wehbook's payload according to the following suffixes:<br />
/event/team-created<br />
/event/code-push<br />
/event/repo<br />
so inside the webhook payload url (in github-organization-webhooks) of each webhook the address must be:<br />
http://${ngrok-temporary-address}.ngrok.io/event/team-created<br />
http://${ngrok-temporary-address}.ngrok.io/event/code-push<br />
http://${ngrok-temporary-address}.ngrok.io/event/repo<br />


