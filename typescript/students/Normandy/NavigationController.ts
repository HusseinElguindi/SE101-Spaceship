import { Vector2 } from '../helpers.js'
import { MapData, ShipStatus} from '../types.js'

import NavigationController from '../../src/subsystems/navigationController.js'
import YourDefenceController from './DefenseController.js'
import YourPropulsionController from './PropulsionController.js'
import YourSensorsController from './SensorsController.js'
import WarpGate from '../../src/spaceObjects/warpGate.js'
//import { NumberLiteralType } from '../../../node_modules/typescript/lib/typescript.js'

export default class YourNavigationController extends NavigationController {
	// To get other subsystem information, use the attributes below.
	// @ts-ignore
	defence: YourDefenceController // @ts-ignore
	sensors: YourSensorsController // @ts-ignore
	propulsion: YourPropulsionController

	//PUBLIC VARIABLES :)
	radius: number = 0;
	angularVelocity: number = 0;
	angle: number = 0;
	positionX: number = 0;
	positionY: number = 0;

	objectAngle: number = 0;

	linearVelocityX: number = 0;
	linearVelocityY: number = 0;


	//did we warp to another solar system?
	warp: boolean = true;
	//galaxy MAP
	galaxyMap = new Map<String, GalaxyData>(); 

	navigationUpdate(getShipStatus: (key: keyof ShipStatus) => number, warp: () => Error|null, land: () => Error|null, getMapData: () => MapData) {

		//get data from sensors
		let passiveScan = this.sensors.passiveScans[0];
		let activeScan = this.sensors.activeScans[0];

		//go to big radius object
		//if ()

		const FindBigRadius = () => {

			if (!(activeScan instanceof Error )) {
				for (let i = 0; i < activeScan.length; i++) {

					let radius = activeScan[i].radius;
					let velocity = activeScan[i].velocity

					//if object is stationary and big enough
					if (velocity == new Vector2(0, 0) && radius >= 15) {
						this.objectAngle = activeScan[i].angle;
						return;
					}
				}
			}

		}

		//update position function
		const UpdatePosition = () => {
			this.angle = getShipStatus('angle');
			this.positionX = getShipStatus('positionX');
			this.positionY = getShipStatus('positionY');
			this.linearVelocityX = getShipStatus('linearVelocityX');
			this.linearVelocityY = getShipStatus('linearVelocityY');
		}

		//go into wormhole
		const Warp = () => {

		}

		//land on planet when below certain speed
		const Land = () => {

		}


		//did we warp to another solar system? (called once we enter the map)
		if (this.warp) {
			


		}


		//call functions
		UpdatePosition();
		FindBigRadius();

	}

}

		//call this when entering a new map
		/*const UpdateMapData = () => {

			UpdatePosition();

			//get mapData from API
			let mapData = getMapData();
			let currentSolarSystem = mapData.galaxy.solarSystems[mapData.galaxy.solarSystems.indexOf(mapData.galaxy.name)]
			
			//does this galaxy exist in the galaxy map?
			if (this.galaxyMap.has(mapData.galaxy.name)) {

			}

			//else this galaxy DOES NOT exist in the map
			else {

				//planets struct
				let planets: Planet = {
					name: mapData.galaxy.solarSystems.name;
					x: number
					y: number
					planetComposition: {
						water: number
						air: number
						land: number
						metal: number
						safety: number
						temperature: number
					}
				}

				//warpGates struct
				let warpGates: WarpGateData = {

				}

				//solar system struct
				let solarSystem: SolarSystemData = {
					name: mapData.solarSystemName
					planets: 
					warpGates: 
				}

				//constructing the galaxy struct
				let galaxyStruct: GalaxyData = {
					name: mapData.galaxy.name;
					galaxy: {

					}
				};

				this.galaxyMap.set(mapData.galaxy.name, mapData.galaxy);
			}
			
			this.warp = false;

		} */

/* export interface MapData {
	solarSystemName: string;
	galaxy: GalaxyData;
} */

//galaxy
export interface GalaxyData {
    name: string;
    solarSystems: SolarSystemData[];
}

//solarsystem
export interface SolarSystemData {
	name: string
	planets: Planet[]
	warpGates: WarpGate[]
}

//planet
export interface Planet {
	name: string
	x: number
	y: number
	planetComposition: {
		water: number
		air: number
		land: number
		metal: number
		safety: number
		temperature: number
	}
}

//warpgate
export interface WarpGateData {
	name: string
	x: number
	y: number
}