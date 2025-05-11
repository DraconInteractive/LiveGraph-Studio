export type DataType = 'string' | 'int' | 'bool' | 'customType' | 'unknown' | 'exec' | 'sentient' | 'position' | 'rotation'

export const colorMap: Record<DataType, string> = {
  string: 'hotpink',
  int: 'skyblue',
  bool: 'orange',
  customType: 'lime',
  unknown: 'gray',
  exec: 'white',
  sentient: 'purple',
  position: 'purple',
  rotation: 'purple'
}