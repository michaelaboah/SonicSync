# SonicSync: Theatrical Sound Design Tool

SonicSync is a tool designed for theatrical sound design and audio production. It aims to streamline and synchronize the various elements of the design process, including cable layouts, signal flow, and equipment lists. SonicSync provides a unified platform where users can manage and integrate these elements.

## Architecture

SonicSync is composed of several sub-projects, each with its own language and toolset, organized into three categories:

### Desktop App

The desktop application is built with Rust and Tauri, with a SvelteKit frontend and a PoloDB embedded database for local data persistence of the downloaded equipment. 
*Avaliable on: Macos, Windows, and Linux*

- **Rust**: Provides memory safety without garbage collection and has a rich type system.
- **Tauri**: A framework for building lightweight, secure, and cross-platform desktop applications.
- **SvelteKit**: Powers the frontend. It's a framework for building high-performance web applications. It's reactive, easy to understand, and compiles to efficient, imperative code that directly manipulates the DOM.
- **PoloDB**: An embedded database used for local data persistence. PoloDB is a lightweight and easy-to-use embedded NoSQL database written in Rust.

### Cloud API

The Cloud API is built with Golang using Gin and GraphQL, and stores common sound equipment in a MongoDB database. Also handles authentication and utility processes

- **Golang**: Known for its efficiency and ease of use.
- **Gin**: A web framework with a martini-like API.
- **GraphQL**: Allows clients to request exactly what they need, making it easier to evolve APIs over time.
- **MongoDB**: A NoSQL database used for storing common sound equipment. MongoDB provides high performance, high availability, and easy scalability.

### Web UI

The Web UI is powered by a SvelteKit frontend and is deployed alongside the Golang API using Docker.

- **SvelteKit**: Powers the frontend. It's a framework for building high-performance web applications. It's reactive, easy to understand, and compiles to efficient, imperative code that directly manipulates the DOM.
- **Graphql-Client**: Used for consuming the data sent from the Cloud API

<!-- ## Getting Started -->
<!---->
<!-- // Instructions on how to install and run the project -->
<!---->
<!-- ## Contributing -->
<!---->
<!-- // Guidelines for contributing to the project -->
<!---->
<!-- ## License -->
<!---->
<!-- // Information about the project's license -->
