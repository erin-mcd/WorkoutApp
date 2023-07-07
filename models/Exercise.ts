import { type ExerciseSet } from './ExerciseSet'

export interface Exercise {
  name: string
  sets: ExerciseSet[]
  id: number
}
