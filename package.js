Package.describe({
  summary: "experimental hack replacing universal-events with jQuery implementation",
});

Package.on_use(function (api) {
  api.use(['jquery', 'underscore'], 'client');
  api.add_files('jquery-events.js', 'client');
});
