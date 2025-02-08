export function validateURL(url: string, schema: "http" | "https") {
  const httpsRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(:\d+)?(\/[^\s]*)?$/i;
  const httpRegex = /^(http?:\/\/)?([\w-]+(\.[\w-]+)+)(:\d+)?(\/[^\s]*)?$/i;

  switch (schema) {
    case "https": {
      return httpsRegex.test(url);
    }

    case "http": {
      return httpRegex.test(url);
    }
  }
}
