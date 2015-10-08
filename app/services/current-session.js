import Ember from 'ember';

const {
  Service,
  get,
  isPresent,
  computed,
  inject: { service }
} = Ember;

export default Service.extend({
  session: service(),
  store: service(),
  userId: null,

  isAuthenticated: computed.alias('session.isAuthenticated'),

  account: computed('userId', function() {
    const userId = get(this, 'userId');
    if (isPresent(userId)) {
      return get(this, 'store').peekRecord('user', userId);
    }
  }),

  authenticateWithOAuth2(identification, password) {
    return get(this, 'session').authenticate('authenticator:oauth2', identification, password);
  },

  invalidate() {
    return get(this, 'session').invalidate();
  }
});