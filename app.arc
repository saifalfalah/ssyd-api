@app
begin-app

@http
get /
post /
post /collect
options /

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
