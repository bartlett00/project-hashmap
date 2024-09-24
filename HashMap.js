export default function HashMap() {
  let buckets = [];
  const loadFactor = 0.75;

  function addBuckets(list, quantity = 16) {
    for (let i = 0; i < quantity; i++) {
      list.push([]);
    }
  }
  addBuckets(buckets);

  function generateHash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % buckets.length;
    }
    return hashCode;
  }

  const has = (key) => {
    let hash = generateHash(key);
    for (let i = 0; i < buckets[hash].length; i++) {
      if (buckets[hash][i].key === key) {
        return true;
      }
    }
    return false;
  };

  const get = (key) => {
    let hash = generateHash(key);
    for (let i = 0; i < buckets[hash].length; i++) {
      if (buckets[hash][i].key === key) {
        return buckets[hash][i].value;
      }
    }
    return null;
  };

  const set = (key, value) => {
    let hash = generateHash(key);
    let nodeValue = get(key);
    if (nodeValue !== null) {
      for (let i = 0; i < buckets[hash].length; i++) {
        if (buckets[hash][i].key === key) {
          buckets[hash][i].value = value;
          return;
        }
      }
    } else {
      let newEntry = { key, value };
      buckets[hash].push(newEntry);
      if (length() > loadFactor * buckets.length) {
        growBuckets();
      }
    }
  };

  function growBuckets() {
    let oldEntries = entries();
    let newLength = buckets.length * 2;
    buckets.length = 0;
    addBuckets(buckets, newLength);
    for (let i = 0; i < oldEntries.length; i++) {
      set(oldEntries[i].key, oldEntries[i].value);
    }
  }

  const remove = (key) => {
    let hash = generateHash(key);
    if (has(key)) {
      buckets[hash].splice(buckets[hash].indexOf(key), 1);
      return true;
    } else {
      return false;
    }
  };

  const length = () => {
    let totalKeys = 0;
    for (let i = 0; i < buckets.length; i++) {
      if (buckets[i].length !== 0) {
        for (let j = 0; j < buckets[i].length; j++) {
          totalKeys++;
        }
      }
    }
    return totalKeys;
  };

  const clear = () => {
    buckets.length = 0;
    addBuckets(buckets);
  };

  const keys = () => {
    let keysArr = [];
    for (let i = 0; i < buckets.length; i++) {
      for (let j = 0; j < buckets[i].length; j++) {
        keysArr.push(buckets[i][j].key);
      }
    }
    return keysArr;
  };

  const values = () => {
    let valuesArr = [];
    for (let i = 0; i < buckets.length; i++) {
      for (let j = 0; j < buckets[i].length; j++) {
        valuesArr.push(buckets[i][j].value);
      }
    }
    return valuesArr;
  };

  const entries = () => {
    let entriesArr = [];
    for (let i = 0; i < buckets.length; i++) {
      entriesArr.push(...buckets[i]);
    }
    return entriesArr;
  };

  return { set, get, has, remove, length, clear, keys, values, entries };
}

/*

bucket growth logic:

if capacity * load factor < entries (keys)
  double capacity
  copy nodes over to new buckets:
    create new bucket list
    repopulate new bucket list with current entries
    new list overwrites old list



[0][1][2][3][4]

key: Carlos
value: "value"

set (key, value) {
    key: Carlos => hash(Carlos) => hashCode = 3
    
    check if key already exists inside a bucket
    get(key) 
        => returns the value or null
    if (get(key) returns a value)
        buckets[hashCode(key)][key] = value;
    else 
        add key value pair to bucket
        buckets[hashCode(key)].push({key, value});
}
    get (key) {

        returns value if key exists 
        inside a bucket in the hashtable,
        otherwise returns null

        key: Carlos
        hash(Carlos) = 3 
        => buckets[3] 
        => if (has(key))
        => return the value in that key
            else, return null
    }

    has (key) {
    
    if key exists hashMap
        return true;
    else
        return false;
    }
    
    remove (key) {
    
    if key exists in hashMap
        remove entry
        return true
    else
        return false
    }

    length() {
        return number of keys in hashMap
    }
*/
