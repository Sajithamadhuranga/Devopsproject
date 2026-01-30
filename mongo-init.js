var admin = db.getSiblingDB("admin");
admin.createUser({
  user: "admin",
  pwd: "password",
  roles: ["root", "dbOwner"]
});

var appDb = admin.getSiblingDB("docker-project");
appDb.createCollection("users");
appDb.createCollection("products");

print("MongoDB initialized successfully");
