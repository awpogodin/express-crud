module.exports = function(request, _response, next) {
  console.log(`${request.method} request to ${request.originalUrl}`);
  if (request.body && Object.keys(request.body).length > 0) {
    console.log('Body:');
    console.log(JSON.stringify(request.body, null, 2));
  }
  next();
};
