## CKEditor for Authorium

Make sure you have upgraded to Yarn 4, as described [here](https://yarnpkg.com/migration/guide#migration-steps).

### Local Development
1. Install deps 
   ```bash
   yarn
   ```
2. Navigate to the CKEditor package folder where modifications were made
   
   ```bash
   cd packages/ckeditor5-build-multi-root
   ```

3. Generates the build folder containing the customized editor

   ```bash
	yarn build
   ```
   
4. Create symlinks to local project, only the first time

   ```bash
	npm link
   ```

### Authorium repository
1. Update the repository

   ```bash
	yarn install --force
   ```

2. Link CKEditor custom editor to Authorium, only the first time

   ```bash
	npm link "@eagerworks/ckeditor5-build-multi-root"
   ```

3. Setup the authorium application `bin/setup`

   ```bash
	bin/setup
   ```
   
4. Run the application `bin/dev`

   ```bash
	bin/dev
   ```

## Publish package
`TODO: Publish package on release`

1. Navigate to the CKEditor package folder where modifications were made
   
   ```bash
   cd packages/ckeditor-build-multi-root
   ```
2. Generate the build folder containing the customized editor

   ```bash
	yarn build
   ```

3. Navigate to the CKEditor package folder where modifications were made, log in to NPM, and adjust package.json to reflect your npm username

    ```bash
	npm login
   ```

4. After successful login, publish your custom build

   ```bash
	npm publish --access=public
   ```
