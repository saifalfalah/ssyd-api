@app
begin-app

@http
get /
post /

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
