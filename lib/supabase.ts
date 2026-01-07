
import { createClient } from '@supabase/supabase-js';
import { LandingPageContent } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials missing. Local storage will be used as fallback.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

export const fetchRemoteContent = async (): Promise<LandingPageContent | null> => {
    // Fail fast if no credentials
    if (!supabaseUrl || !supabaseAnonKey) return null;

    try {
        const { data, error } = await supabase
            .from('site_content')
            .select('content')
            .order('updated_at', { ascending: false })
            .limit(1)
            .maybeSingle(); // maybeSingle doesn't error on 0 rows

        if (error) {
            console.error('Error fetching remote content:', error);
            return null;
        }
        return data?.content as LandingPageContent;
    } catch (err) {
        console.error('Remote fetch failed:', err);
        return null;
    }
};

export const saveRemoteContent = async (content: LandingPageContent) => {
    if (!supabaseUrl || !supabaseAnonKey) return;

    try {
        // Try to get ANY existing record ID
        const { data: records, error: fetchError } = await supabase
            .from('site_content')
            .select('id')
            .limit(1);

        if (fetchError) {
            console.error('Fetch error during save:', fetchError);
        }

        const existingId = records && records.length > 0 ? records[0].id : null;

        if (existingId) {
            const { error: updateError } = await supabase
                .from('site_content')
                .update({ content, updated_at: new Date().toISOString() })
                .eq('id', existingId);

            if (updateError) console.error('Update error:', updateError);
            else console.log('✅ Remote content updated');
        } else {
            const { error: insertError } = await supabase
                .from('site_content')
                .insert([{ content, updated_at: new Date().toISOString() }]);

            if (insertError) console.error('Insert error:', insertError);
            else console.log('✅ Remote content initialized');
        }
    } catch (err) {
        console.error('Remote save failed:', err);
    }
};
