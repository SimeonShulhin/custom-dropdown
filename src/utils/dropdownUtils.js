export const dropdownUtils = {
  getOptionValue: (option) => {
    if (!option) return '';
    if (typeof option === 'string') return option;
    return option.value || option.label || option.id || option;
  },

  getOptionLabel: (option) => {
    if (typeof option === 'string') return option;
    return option.label || option.name || option.value || option;
  },

  defaultSearch: (searchTerm, options) => {
    if (!searchTerm) return options;
    return options.filter(option => {
      const searchableText = typeof option === 'string'
        ? option
        : option.label || option.name || option.value || '';
      return searchableText.toLowerCase().includes(searchTerm.toLowerCase());
    });
  },

  asyncSearch: async (searchTerm, options, delay = 500) => {
    await new Promise(resolve => setTimeout(resolve, delay));
    return dropdownUtils.defaultSearch(searchTerm, options);
  }
};
