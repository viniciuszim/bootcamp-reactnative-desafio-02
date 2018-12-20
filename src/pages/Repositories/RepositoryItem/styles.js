import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    padding: metrics.basePadding,
    marginHorizontal: metrics.baseMargin * 2,
    marginTop: metrics.baseMargin,
    flexDirection: 'row',
    alignItems: 'center',
  },

  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 40,
    height: 40,
    marginRight: metrics.basePadding,
    borderRadius: 20,
  },

  infoContainer: {
    flex: 1,
    height: 40,
    paddingRight: metrics.basePadding,
  },

  titleText: {
    color: colors.black,
    fontSize: 14,
    fontWeight: 'bold',
  },

  organizationText: {
    color: colors.regular,
    fontSize: 12,
  },

  icon: {
    color: colors.dark,
    fontSize: 18,
  },
});

export default styles;
