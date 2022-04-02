//
// Copyright © 2020, 2021 Anticrm Platform Contributors.
//
// Licensed under the Eclipse Public License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License. You may
// obtain a copy of the License at https://www.eclipse.org/legal/epl-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//
// See the License for the specific language governing permissions and
// limitations under the License.
//

import type { Class, Doc, Mixin, Obj, Ref, Space } from '@anticrm/core'
import type { Asset, IntlString, Metadata, Plugin, Resource } from '@anticrm/platform'
import { plugin } from '@anticrm/platform'
import { AnyComponent } from '@anticrm/ui'

/**
 * @public
 */
export interface Application extends Doc {
  label: IntlString
  icon: Asset
  hidden: boolean
  navigatorModel?: NavigatorModel

  // Component will be displayed in case navigator model is not defined, or nothing is selected in navigator model
  component?: AnyComponent

  navHeaderComponent?: AnyComponent
  navFooterComponent?: AnyComponent
}

/**
 * @public
 */
export interface SpacesNavModel {
  label: IntlString
  spaceClass: Ref<Class<Space>>
  addSpaceLabel: IntlString
  createComponent: AnyComponent
  icon?: Asset

  // Child special items.
  specials?: SpecialNavModel[]
}

/**
 * @public
 */
export interface NavigatorModel {
  spaces: SpacesNavModel[]
  specials?: SpecialNavModel[]
}

/**
 * @public
 */
export interface SpecialNavModel {
  id: string // Uniq id
  label: IntlString
  icon?: Asset
  component: AnyComponent
  componentProps?: Record<string, string>
  position?: 'top'|'bottom' // undefined == 'top
  visibleIf?: Resource<(spaces: Space[]) => boolean>
  // If defined, will be used to find spaces for visibleIf
  spaceClass?: Ref<Class<Space>>
}

/**
 * @public
 */
export interface ViewConfiguration {
  class: Ref<Class<Doc>> // show object of this class
  createItemDialog?: AnyComponent
  createItemLabel?: IntlString
}

/**
 * @public
 */
export interface SpaceView extends Class<Obj> {
  view: ViewConfiguration
}

/**
 * @public
 */
export const workbenchId = 'workbench' as Plugin

export default plugin(workbenchId, {
  class: {
    Application: '' as Ref<Class<Application>>
  },
  mixin: {
    SpaceView: '' as Ref<Mixin<SpaceView>>
  },
  component: {
    WorkbenchApp: '' as AnyComponent
  },
  metadata: {
    PlatformTitle: '' as Metadata<string>,
    ExcludedApplications: '' as Metadata<Ref<Application>[]>
  }
})
