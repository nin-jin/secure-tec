namespace $ {

	export class $tec_controller_service extends $tec_server {

		@ $mol_mem
		peer() {
			let serial = $.$mol_env().PRIVATE_KEY ?? $mol_state_arg.value('private_key')
			if( serial ) return $mol_wire_sync( $hyoo_crowd_peer ).restore( serial )
			
			const peer = $mol_wire_sync( $hyoo_crowd_peer ).generate()
			return peer
		}
		
		@ $mol_mem
		Model() {
			return this.world().Fund( $tec_controller ).Item( this.peer().id )
		}
		
		@ $mol_mem
		intent_active() {
			this.Model().active( this.Model().intent()?.active() ?? false )
		}

		@ $mol_mem
		greeting() {
			this.$.$mol_log3_rise({
				place: `${this}.Peer()`,
				message: 'My ID',
				id: this.peer().id,
			})
		}
		
		auto() {
			super.auto()
			this.intent_active()
			this.greeting()
		}

	}
	
}
