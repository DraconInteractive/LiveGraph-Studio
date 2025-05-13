export type DataType = 'string' | 'int' | 'bool' | 'customType' | 'unknown' | 'exec' | 'sentient' | 'position' | 'rotation'

export const colorMap: Record<DataType, string> = {
  string: 'rosybrown',
  int: 'skyblue',
  bool: 'red',
  customType: 'lime',
  unknown: 'gray',
  exec: 'white',
  sentient: 'purple',
  position: 'purple',
  rotation: 'purple'
}