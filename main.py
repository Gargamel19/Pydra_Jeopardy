from app import app
from flask_cors import CORS

CORS(app)

app.run(host="81.169.222.172", port="43173")
#app.run(port="43173")
