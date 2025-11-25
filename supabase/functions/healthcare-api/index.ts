import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { endpoint, data, userId } = await req.json();

    // Get the healthcare API key from secrets (user needs to add it)
    const healthcareApiKey = Deno.env.get('HEALTHCARE_API_KEY');
    
    if (!healthcareApiKey) {
      return new Response(
        JSON.stringify({ error: 'Healthcare API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Calling healthcare API:', endpoint);

    // Make the external healthcare API call
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${healthcareApiKey}`,
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    // Log the API call
    if (userId) {
      await supabase.from('healthcare_api_logs').insert({
        user_id: userId,
        api_endpoint: endpoint,
        request_data: data,
        response_data: responseData,
        status_code: response.status,
      });
    }

    return new Response(
      JSON.stringify(responseData),
      { 
        status: response.status, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Healthcare API error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
