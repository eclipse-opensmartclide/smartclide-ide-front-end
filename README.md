# SmartCLIDE IDE

This is the base project of the SmartCLIDE IDE User Interface where all the SmartCLIDE components will be integrated
and made available to the users.

The current version provides:

- Basic website structure
- User authentication with previously created Eclipse Che accounts
- Dashboard with some widget's examples
- Opening and closing existing workspaces
- Developing code using an instance of Eclipse Che Theia

The upcoming features will include:

- Full user management functionalities
- Dashboard with interactive and dynamic widgets
- Complete workspace management tools
- Support for complete development flows

## Instructions to run the project ##

### Install Meteor on your computer

https://www.meteor.com/developers/install

#### OSX / Linux
```shell
curl https://install.meteor.com/ | sh
```

#### Windows
```shell
npm install -g meteor
```

### Clone the project from GitLab 

```shell
git clone git@github.com:eclipse-researchlabs/smartclide-ide-front-end.git
```

### Install dependencies and run the project

```shell
cd ide
meteor npm install
meteor --port 8080
```

## Main Pages

### Login

Users can log in by providing:

1) SmartCLIDE credentials (i.e., username/email and password) - is intended for development uses only.
2) SmartCLIDE Eclipse Che credentials - all users are expected to use this option.

Keep in mind that signing up will only become available in future versions, i.e., only previously defined credentials
can be used at the moment.

![](readme-pictures/Login.png)

### Dashboard

After logging in, the user is redirected to the dashboard where they can see an overview of their work through a set
of movable widgets.

![](readme-pictures/Dashboard.png)

### Project View

By clicking a project in the "Recent" section, the project view is presented. There, the code of the previously
configured workspace can be edited.

![](readme-pictures/Project.png)

## License
[MIT](https://choosealicense.com/licenses/mit/)
