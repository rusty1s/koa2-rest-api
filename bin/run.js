'use strict';

import http from 'http';
import app from '../server';

app.server = http.createServer();

const port = 3000;
app.server.listen(
    process.env.PORT || port,
    () => console.log(`Server started on port ${app.server.address().port}`));
