#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import { App } from './ui/App.js';
import path from 'path';

const targetPath = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();

render(React.createElement(App, { rootPath: targetPath }));
