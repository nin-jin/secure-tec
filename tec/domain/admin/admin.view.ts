namespace $.$$ {
	export class $tec_domain_admin extends $.$tec_domain_admin {
		
		@ $mol_mem
		Peer() {
			let serial = "Mqqqy5qu5_-By0Ad9iQqO6L6EffCFt8XTsRrssCaoYsXz858S4HSdDMY017-M3nO9HZY767KQZKQvk9MhdbvpAhlOKEPyBiOy3Y14ZnR6e9Nc0krzC1CiKe3lEw0Ju0Y8"
			return $mol_wire_sync( $hyoo_crowd_peer ).restore( serial )
		}
		
		id() {
			return this.Peer().id
		}
		
		@ $mol_mem
		domain() {
			return this.yard().world().Fund( $tec_domain ).Item( this.Peer().id )
		}

		@ $mol_action
		new_key_copy() {
			const peer = $mol_wire_sync( $hyoo_crowd_peer ).generate()
			return peer.key_private_serial
		}
		
	}
}
