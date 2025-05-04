export type DataType = 'string' | 'int' | 'bool' | 'customType' | 'unknown' | 'exec'

export const colorMap: Record<DataType, string> = {
  string: 'hotpink',
  int: 'skyblue',
  bool: 'orange',
  customType: 'lime',
  unknown: 'gray',
  exec: 'white'
}