# DD2525-Malicious-Extension-Project
A simple malicious extension for chrome. It's an extension to change the background color of a web page, but it can actually record the user's keyboard input and send it to a remote server along with the URL of the web page. It can also take a screenshot of the web page the user is viewing and send it to a remote server.

## Remote Server Setting

Our remote server is ubuntu and we install apache with the following command:

```bash
sudo apt install apache2
```

Then we go to the path **/var/www/html** and delete index.html, copy and paste the **index.php** from the **remote_server** folder into the current path.

Finally start apache.

```bash
sudo systemctl start apache2
```

## How to load the extension into chrome browser

Go to the extensions management interface of chrome browser (**chrome://extensions/**) and make sure Developer mode is enabled, click Load unpacked and select the spyExtension folder.

![Screenshot ](/Users/keyaohuang/github/DD2525-Malicious-Extension-Project/Screenshot.png)
