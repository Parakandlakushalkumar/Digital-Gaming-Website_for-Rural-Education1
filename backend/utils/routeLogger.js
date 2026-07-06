/**
 * Extract all registered Express routes for startup debugging.
 */
function cleanRoutePath(path) {
  return (path || '/')
    .replace(/\/\?\//g, '/')
    .replace(/\/\?\(\?=\/\|\$\)/g, '')
    .replace(/\/+/g, '/');
}

export function getRegisteredRoutes(app) {
  const routes = [];

  const walk = (stack, basePath = '') => {
    if (!stack) return;

    for (const layer of stack) {
      if (layer.route?.path != null) {
        const path = cleanRoutePath(`${basePath}${layer.route.path}`);
        const methods = Object.keys(layer.route.methods)
          .filter((method) => method !== '_all')
          .map((method) => method.toUpperCase());

        for (const method of methods) {
          routes.push({ method, path });
        }
        continue;
      }

      if (layer.name === 'router' && layer.handle?.stack) {
        let routerPath = basePath;

        if (layer.regexp && !layer.regexp.fast_slash) {
          const source = layer.regexp.source;
          const match = source.match(/^\^\\\/((?:[^\\(]|\\\/)+)/);
          if (match?.[1]) {
            routerPath = cleanRoutePath(`/${match[1].replace(/\\\//g, '/')}`);
          }
        }

        walk(layer.handle.stack, routerPath);
      }
    }
  };

  walk(app._router?.stack);
  return routes.sort((a, b) => a.path.localeCompare(b.path) || a.method.localeCompare(b.method));
}

export function printRegisteredRoutes(app) {
  const routes = getRegisteredRoutes(app);
  console.log('\n--- Registered API Routes ---');
  for (const route of routes) {
    console.log(`${route.method.padEnd(7)} ${route.path}`);
  }
  console.log(`--- Total: ${routes.length} route handlers ---\n`);
  return routes;
}
