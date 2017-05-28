export const tank = {
  id: 'tank',
  name: 'Tank',
  icon: 'ra ra-helmet',
  get strength () { return [ cunning, melee ]},
  get weakness () { return [ magic, range ]}
};

export const melee = {
  id: 'melee',
  name: 'Melee',
  icon: 'ra ra-battered-axe',
  get strength () { return [ cunning, range ]},
  get weakness () { return [ magic, tank ]},
};

export const range = {
  id: 'range',
  name: 'Range',
  icon: 'ra  ra-archer',
  get strength () { return [ magic, tank ]},
  get weakness () { return [ cunning, melee ]}
};

export const cunning = {
  id: 'cunning',
  name: 'Cunning',
  icon: 'ra ra-dripping-knife',
  get strength () { return [ magic, range ]},
  get weakness () { return [ melee, tank ]}
};

export const magic = {
  id: 'magic',
  name: 'Magic',
  icon: 'ra ra-barrier',
  get strength () { return [ melee, tank ]},
  get weakness () { return [ cunning, range ]}
};