![CICD](https://github.com/dfar-io/budgeteer/actions/workflows/cicd.yml/badge.svg)
![TFLint](https://github.com/dfar-io/budgeteer/actions/workflows/tflint.yml/badge.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/66f6382b0c80a71ea41f/maintainability)](https://codeclimate.com/github/dfar-io/budgeteer/maintainability)

# Budgeteer

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.6.

## Getting Started

1. Create Codespace.
2. `F5` to run locally.

## Run CodeClimate

First, install:

```
curl -L https://github.com/codeclimate/codeclimate/archive/master.tar.gz | tar xvz
cd codeclimate-* && sudo make install && cd ..
```

Then to run:

```
codeclimate analyze
```

## Update Packages

1. Run `ng update`, determine outdated packages.
2. Run `ng update` with the commands to update specific packages.

## Infrastructure Deployment

Terraform is set up within the Codespace and can be run manually within the Codepsace as needed.

```
cd tf
. ./init.sh
terraform apply
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
