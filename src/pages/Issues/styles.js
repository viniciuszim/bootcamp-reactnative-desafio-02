import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lighter,
  },

  filterIssue: {
    flex: 0.05,
    marginHorizontal: metrics.baseMargin * 2,
    marginTop: metrics.baseMargin * 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.light,
    borderRadius: metrics.baseRadius * 2,
    paddingLeft: metrics.basePadding * 2,
    paddingRight: metrics.basePadding * 2,
  },

  filterTextActivate: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.dark,
  },

  filterText: {
    fontSize: 12,
    color: colors.regular,
  },

  noneContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  noneText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  listRepository: {
    flex: 1,
  },
});

export default styles;
