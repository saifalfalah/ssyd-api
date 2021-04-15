@app
begin-app

@http
get /
post /
post /collect

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
