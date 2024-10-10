# Streambox

<img src="Web/public/utilites/Image.png" alt="logo" width="300" />

## Disclaimer

This project represents an early step in my programming journey and was developed as part of a team. While it showcases
our collective efforts, it may not reflect the coding standards or practices I strive for today. Please be aware that it
is not actively maintained, and some aspects may not align with my current approach to software development.

## About

**Streambox** is a comprehensive video-sharing platform designed to mirror the core functionalities of popular streaming
services. Available as both a web application and an Android app, Streambox allows users to easily upload, view, and
interact with video content.

For more detailed information, please refer to the [Streambox Wiki](Wiki/Wiki.md).

## Some Features

- **Cross-Platform Access**: Enjoy seamless video streaming and management on both the web and Android app.
- **User-Friendly Interface**: Navigate through a clean and intuitive design that enhances user experience.
- **Account Management**: Easily create and manage your account, allowing for personalized content recommendations and
  video uploads.
- **Customizable Experience**: Switch to Dark Mode for a more comfortable viewing experience.
- **Interactive Community**: Engage with other users through comments and profile visits.

## How to Build and Run

To build and run Streambox, follow these steps:

1. **Compile the TCP Server**:
   - Navigate to `server/tcp-server/` and run the command:
     ```
     make
     ```
   - Note: The server must be run on POSIX compliant systems.
2. **Start the TCP Server**:

   - Run the following command to start the server:
     ```bash
     ./tcpServer
     ```

3. **Build and Run the Web Application**:

   - Open a new terminal and navigate to the `server/` directory. Then run:
     ```bash
     npm start
     ```
   - This command builds and launches the ReactJS and NodeJS applications.

4. **Access the Application**:
   - Open your web browser and go to [http://localhost:3000/](http://localhost:3000/) to view the web application.
   - To run the Android app, use an emulator of your choice.

With these steps, you'll have Streambox up and running, ready for video sharing and interaction
