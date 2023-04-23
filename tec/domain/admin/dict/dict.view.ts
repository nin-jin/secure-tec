namespace $.$$ {
	export class $tec_domain_admin_dict extends $.$tec_domain_admin_dict {
		
		@ $mol_mem
		rows() {
			return [
				... this.node().keys().map( id => this.Item( id ) ),
				this.Add(),
			]
		}
		
		item_id( id: $mol_int62_string ) {
			return id
		}
		
		item_title( id: $mol_int62_string, next?: string ) {
			return this.node().sub( id, $hyoo_crowd_reg ).str( next )
		}
		
		@ $mol_action
		item_drop( id: $mol_int62_string ) {
			return this.node().drop( id )
		}
		
		@ $mol_action
		add_submit() {
			
			const id = $mol_int62_string_ensure( this.add_id() )
			if( !id ) throw new Error( 'wrong id' )
			
			this.node().sub( id, $hyoo_crowd_reg ).str( this.add_title() )
			this.add_id( '' )
			this.add_title( '' )
			
		}
		
	}
}
