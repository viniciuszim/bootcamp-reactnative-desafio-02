import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lighter,
  },

  addRepository: {
    flex: 0.05,
    margin: metrics.baseMargin * 2,
    paddingBottom: metrics.basePadding,
    borderBottomWidth: 1,
    borderColor: colors.light,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  input: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    height: 34,
    paddingHorizontal: metrics.basePadding,
    marginRight: metrics.baseMargin * 2,
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
