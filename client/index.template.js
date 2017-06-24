const template = ({
  name,
  boardState
}) =>
`<!DOCTYPE html>
<html>
<head>
    <title>${name}</title>
    <link href='https://fonts.googleapis.com/css?family=Source+Code+Pro|Source+Sans+Pro' rel='stylesheet' type='text/css'>
</head>
<body>
    <script type="text/javascript">
      var boardState = ${boardState};
    </script>
    <div id="content">
    </div>
    <script src="http://localhost:8090/webpack-dev-server.js"></script>
    <script type="text/javascript" src="http://localhost:8090/assets/bundle.js"></script>
</body>
</html>`

module.exports = template
