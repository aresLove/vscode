/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';

import 'vs/editor/browser/editor.all';
import 'vs/editor/contrib/quickOpen/browser/quickOutline.contribution';
import 'vs/editor/contrib/quickOpen/browser/gotoLine.contribution';
import 'vs/editor/contrib/quickOpen/browser/quickCommand.contribution';
import 'vs/languages/languages.main';
import 'vs/languages/typescript/common/typescript.contribution';
import 'vs/languages/php/common/php.contribution';
import 'vs/languages/json/common/json.contribution';

import {createMonacoBaseAPI} from 'vs/editor/common/standalone/standaloneBase';
import {createMonacoEditorAPI} from 'vs/editor/browser/standalone/standaloneEditor';
import {createMonacoLanguagesAPI, registerMonarchStandaloneLanguage, registerStandaloneSchema} from 'vs/editor/browser/standalone/standaloneLanguages';
import {DefaultConfig} from 'vs/editor/common/config/defaultConfig';
import {ILanguageDef} from 'vs/editor/standalone-languages/types';
import {IJSONSchema} from 'vs/base/common/jsonSchema';

// Set defaults for standalone editor
DefaultConfig.editor.wrappingIndent = 'none';
DefaultConfig.editor.folding = false;

var global:any = self;
global.monaco = createMonacoBaseAPI();
global.monaco.editor = createMonacoEditorAPI();
global.monaco.languages = createMonacoLanguagesAPI();

// Register all built-in standalone languages
let MonacoEditorLanguages: ILanguageDef[] = this.MonacoEditorLanguages || [];
MonacoEditorLanguages.forEach((language) => {
	registerMonarchStandaloneLanguage(language, language.defModule);
});

// Register all built-in standalone JSON schemas
let MonacoEditorSchemas: { [url:string]: IJSONSchema } = this.MonacoEditorSchemas || {};
for (var uri in MonacoEditorSchemas) {
	registerStandaloneSchema(uri, MonacoEditorSchemas[uri]);
}
