class CypherParser {

  parse (rawResult) {
    var records = rawResult.records,
      result;

    if (records.length <= 1) {
      result = this._parseRow(records[0]);
    } else {
      result = [];

      records.forEach((element) => {
        result.push(this._parseRow(element));
      })
    }

    return result;
  }

  _parseRow (rawResult) {
    var result = {},
      keys = rawResult.keys,
      fields = rawResult._fields,
      lookup = rawResult._fieldLookup,
      rawElement;

    keys.forEach((key) => {
      rawElement = fields[lookup[key]];

      if (Array.isArray(rawElement)) {
        result[key] = this._normalizeArray(rawElement);
      } else if ((typeof rawElement).toLowerCase() === 'number') {
        result[key] = rawElement;
      } else {
        // This provides alternative modes.
        result[key] = this._normalizeObject(rawElement);
        // result = this._normalizeObject(rawElement);
      }
    });

    return result;
  }

  _normalizeArray(array) {
    var result = [];

    array.forEach((element) => {
      if (Array.isArray(element)) {
        result.push(this._normalizeArray(element));
      } else {
        result.push(this._normalizeObject(element));
      }
    });

    return result;
  }

  _normalizeObject(object) {
    var keys,
      newObject = {};

    if (this._isSimpleObject(object)) {
      return object.properties;
    } else {
      keys = Object.getOwnPropertyNames(object);

      keys.forEach((key) => {
        var value = object[key];

        if (Array.isArray(value)) {
          newObject[key] = this._normalizeArray(value);
        } else {
          newObject[key] = this._normalizeObject(value);
        }
      });

      return newObject;
    }
  }

  _isSimpleObject(object) {
    return object.identity && object.labels && object.properties;
  }
}
