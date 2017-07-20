$(Document).ready(function(){
    for(var i=0;i<local_data.length;i++)
    {
        $('#q'+i).val(local_data[i].quantity);
    }
});