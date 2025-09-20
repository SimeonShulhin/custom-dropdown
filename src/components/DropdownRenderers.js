const DropdownRenderers = {
  renderCustomItem: (item) => (
    <div>
      <div className="font-medium">{item.label}</div>
      <div className="text-sm text-gray-500">{item.description}</div>
      {item.category && (
        <div className="text-xs text-blue-600 mt-1">{item.category}</div>
      )}
    </div>
  ),

  renderSelectedItem: (item) => (
    <span className="font-medium">{item.label}</span>
  ),

  renderUser: (user) => (
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
        {user.avatar || user.name.charAt(0)}
      </div>
      <div className="flex-1">
        <div className="font-medium">{user.name}</div>
        <div className="text-sm text-gray-500">{user.email}</div>
        <div className="text-xs text-blue-600">{user.role} • {user.department}</div>
      </div>
    </div>
  ),

  renderSelectedUser: (user) => (
    <div className="flex items-center space-x-2">
      <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
        {user.avatar || user.name.charAt(0)}
      </div>
      <span>{user.name}</span>
      <span className="text-sm text-gray-500">({user.role})</span>
    </div>
  ),

  renderCountry: (country) => (
    <div className="flex items-center space-x-3">
      <span className="text-2xl">{country.flag}</span>
      <div className="flex items-center">
        <div className="font-medium">{country.name}</div>
        <sup className="text-xs text-gray-500">{country.code}</sup>
      </div>
    </div>
  ),

  renderSelectedCountry: (country) => (
    <div className="flex items-center space-x-2">
      <span className="text-lg">{country.flag}</span>
      <span>{country.name}</span>
    </div>
  )
};

export default DropdownRenderers;