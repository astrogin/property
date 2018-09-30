const status = ['START', 'SUCCESS', 'ERROR', 'FINAL'];

export function mutationTypesGenerator(propNames, actions, isAsync) {
  let result = {};
  if (!Array.isArray(actions)) {
    actions = [actions];
  }
  if (!Array.isArray(propNames)) {
    propNames = [propNames];
  }
  if (isAsync) {
    for (let propName of propNames) {
      for (let action of actions) {
        for (let stat of status) {
          let prop = `${action}_${propName}_${stat}`.toUpperCase();
          result[prop] = prop;
        }
      }
    }
    return result;
  } else {
    for (let propName of propNames) {
      for (let action of actions) {
        let prop = `${action}_${propName}`.toUpperCase();
        result[prop] = prop;
      }
    }
    return result;
  }
}
