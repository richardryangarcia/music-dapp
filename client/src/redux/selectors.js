export const getAccount = state => state.application && state.application.account;

export const getFactory = state => state.ArtistFactory && state.ArtistFactory.instance && state.ArtistFactory.instance;

export const getArtists = state => state.Artist;

export const getProjects = state => state.Project;

export const getWeb3th = state => state.application && state.application.web3th;

export const getNetworkId = state => state.application && state.application.networkId;
