'use strict';

const request = async function (query) {
  const url = `https://plmcbks.amanoteam.com/search/books?query_name=${query}`
    + '&search_type=fast&page_number=0&max_items=1000';
  try {
    const response = await fetch(url);
    const status = response.status;
    const object = await response.json();
    return parseRequest(status, object);
  } catch (error) {
    console.log(error);
    return {'status': 'offline'}
  }
};

const parseDuration = function (seconds) {
  return !seconds ? null : new Date(seconds * 1000).toISOString().substr(11, 8);
};

const bytesToSize = function (bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) {
    return '0 Byte'
  }
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};

const parseRequest = function (status, object) {
  if (status !== 200) {
    return { status };
  }
  const documents = object['results']['items'];
  const books = documents.filter(book => book['documents'][0])
    .map(book => {
      const size = bytesToSize(book['documents'][0]['file_size']);
      const duration = parseDuration(book['duration']);
      return {
        'title': book['title'],
        'type': book['type']['name'],
        'idCover': book['id'],
        'idBook': book['documents'][0]['id'],
        'size': size,
        'extension': book['documents'][0]['file_extension'],
        'duration': duration,
        'chapters': book['chapters']
      };
    })
    .sort((a, b) => {
      return a['title'] === b['title'] ? 0 : a['title'] < b['title'] ? -1 : 1;
    });
  return {status, books};
};