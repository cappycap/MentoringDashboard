/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState } from 'react'
import { set, get, getTTL, ttl } from './Storage.js'

const userContext = React.createContext(get('User'));
const { Provider, Consumer } = userContext;

export { Provider };
export default userContext;
