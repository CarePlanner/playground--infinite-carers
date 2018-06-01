export function settingsTransformer(row) {
  return {
    month: parseInt(row[2]),
    hourly: {
      enabled: row[3] === '2' || row[3] === '3',
      entitlement: {
        type: 'acasAccrual',
        value: 165
      },
      excess: {
        type: 'carryAll'
      },
      rate: 'usual'
    },
    daily: {
      enabled: row[3] === '1' || row[3] === '3',
      entitlement: parseInt(row[5]),
      excess: {
        type: 'carryAll'
      }
    }
  }
};
