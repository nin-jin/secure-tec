namespace $.$$ {
	export class $tec_domain_admin_rights extends $.$tec_domain_admin_rights {
		
		@ $mol_mem
		rights() {
			
			const Controller = this.domain().world()!.Fund( $tec_controller )
			const controllers = this.domain().controllers().keys()
				.map( $mol_int62_string_ensure )
				.filter( $mol_guard_defined )
				.map( id => Controller.Item( id ) )
			
			const rules = [] as [ $mol_int62_string, $mol_int62_string ][]
			for( const cont of controllers ) {
				
				const intent = cont.intent()
				if( !intent ) continue
				
				for( const person of intent.land.peers() ?? [] ) {
					if( person === intent.land.id() ) continue
					if( person === $tec_domain.id ) continue
					rules.push([ cont.id(), person ])
				}
				
			}
			
			return rules
		}
		
		@ $mol_mem
		rows() {
			return [
				... this.rights().map( id => this.Item( id ) ),
				this.Add(),
			]
		}
		
		item_person( [ controller, person ]: [ $mol_int62_string, $mol_int62_string ] ) {
			if( !this.domain().persons().has( person ) ) return person
			return this.domain().persons().sub( person, $hyoo_crowd_reg ).str() || person
		}
		
		item_controller( [ controller, person ]: [ $mol_int62_string, $mol_int62_string ] ) {
			if( !this.domain().controllers().has( controller ) ) return controller
			return this.domain().controllers().sub( controller, $hyoo_crowd_reg ).str() || controller
		}
		
		@ $mol_mem
		persons() {
			const dict = this.domain().persons()
			return Object.fromEntries([
				[ '', '[Person]' ],
				... dict.keys().map( id => [
					id,
					dict.sub( id, $hyoo_crowd_reg ).str(),
				] )
			])
		}
		
		@ $mol_mem
		controllers() {
			const dict = this.domain().controllers()
			return Object.fromEntries([
				[ '', '[Controller]' ],
				... dict.keys().map( id => [
					id,
					dict.sub( id, $hyoo_crowd_reg ).str(),
				] )
			])
		}
		
		@ $mol_action
		add_submit() {
			
			const person = $mol_int62_string_ensure( this.add_person() )!
			const controller = $mol_int62_string_ensure( this.add_controller() )!
			
			const Controller = this.domain().world()!.Fund( $tec_controller )
			const intent = Controller.Item( controller ).intent()
			if( intent ) intent.land.level( person, $hyoo_crowd_peer_level.mod )
			
			this.add_person( '' )
			this.add_controller( '' )
			
		}
		
	}
}
