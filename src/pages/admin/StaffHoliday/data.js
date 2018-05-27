export default [
  {
    year: '2018',
    month: 5,
    hourly: {
      enabled: true,
      entitlement: {
        type: 'fixed',
        value: 165
      },
      excess: {
        type: 'carryAll'
      },
      rate: 'usual'
    },
    daily: {
      enabled: false,
      entitlement: 22,
      excess: {
        type: 'carryAll'
      }
    }
  }
];
