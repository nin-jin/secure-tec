namespace $ {
	
	$mol_test({
		
		async '✅ operator sees sensors data'( $ ) {
			
			const world_sensor = new $hyoo_crowd_world( await $hyoo_crowd_peer.generate() )
			const sensor = world_sensor.land( world_sensor.peer!.id ).chief.as( $tec_controller )
			
			const operator = $tec_operator_dash.make({ $ })
			const world_oper = await $mol_wire_async( operator.yard() ).world()
			const data_view = operator.Controller( sensor.id() )
			
			sensor.value( 0 )
			await world_oper.merge( world_sensor )
			$mol_assert_like( data_view.value_current_pretty(), '0.00' )
			
			sensor.value( 1.2345 )
			await world_oper.merge( world_sensor )
			$mol_assert_like( data_view.value_current_pretty(), '1.23' )
			
		},
		
		async '❌ unauthorized operator tries to rule driver'( $ ) {
			
			const world_driver = new $hyoo_crowd_world( await $hyoo_crowd_peer.generate() )
			const driver = world_driver.land( world_driver.peer!.id ).chief.as( $tec_controller )
			
			const operator = $tec_operator_dash.make({ $ })
			const data_view = operator.Controller( driver.id() )
			
			$mol_assert_fail( ()=> data_view.value_intent( 1.2345 ) )
			
		},
		
		async '✅ authorized operator rules driver'( $ ) {
			
			const world_driver = new $hyoo_crowd_world( await $hyoo_crowd_peer.generate() )
			const driver = world_driver.land( world_driver.peer!.id ).chief.as( $tec_controller )
			
			const operator = $tec_operator_dash.make({ $ })
			const world_operator = await $mol_wire_async( operator.yard() ).world()
			const data_view = operator.Controller( driver.id() )
			
			const admin = $tec_domain_admin.make({ $ })
			const world_admin = await $mol_wire_async( admin.yard() ).world()
			const right_view = admin.Rights()
			
			await $mol_wire_async( driver ).intent()
			await world_admin.merge( world_driver )
			
			right_view.Add_person().value( operator.id() )
			right_view.Add_controller().value( driver.id() )
			right_view.add_submit()
			await world_operator.merge( world_admin )
			$mol_assert_like( driver.intent()?.value(), 0 )
			
			data_view.value_intent( 1.2345 )
			await world_driver.merge( world_operator )
			$mol_assert_like( driver.intent()?.value(), 1.2345 )
			
		},
		
	})
	
}
